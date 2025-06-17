package com.pranshulgg.notesmaster;

import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.app.AppCompatDelegate;
import androidx.biometric.BiometricManager;
import androidx.core.content.res.ResourcesCompat;

import android.animation.ArgbEvaluator;
import android.animation.ObjectAnimator;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.graphics.Typeface;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.text.InputType;
import android.util.TypedValue;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.JavascriptInterface;
import android.webkit.JsPromptResult;
import android.webkit.JsResult;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.EditText;
import android.widget.FrameLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.material.snackbar.Snackbar;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

public class SettingsActivity extends AppCompatActivity {
    private WebView webview;
    private boolean doubleBackToExitPressedOnce = false;
    private ValueCallback<Uri[]> filePathCallback;
    private static final int REQUEST_PERMISSION_CODE = 1;
    private final static int FILECHOOSER_RESULTCODE = 1;
    private final static int EXPORT_REQUEST_CODE = 2;
    private static final int PERMISSION_REQUEST_CODE = 3;
    private static final int SAVE_DOCUMENT_REQUEST_CODE = 2;
    private static final int IMPORT_REQUEST_CODE = 3;

    private FrameLayout overlayLayout;
    private String dataToSave;
    @Override
    public void onBackPressed() {
        if (webview.canGoBack()) {
            webview.goBack();
        } else {
            super.onBackPressed();
        }
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SharedPreferences prefs = getSharedPreferences("theme_prefs", MODE_PRIVATE);
        boolean isDarkMode = prefs.getBoolean("theme_mode", false);
        setAppTheme(this, isDarkMode);
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);
        overlayLayout = findViewById(R.id.overlayLayout);
        webview = findViewById(R.id.webView);
        WebSettings webSettings = webview.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setAllowFileAccessFromFileURLs(true);
        webSettings.setAllowUniversalAccessFromFileURLs(true);
        webSettings.setAllowContentAccess(true);
        webview.setOverScrollMode(WebView.OVER_SCROLL_NEVER);
        webview.setVerticalScrollBarEnabled(false);
        webview.setHorizontalScrollBarEnabled(false);
        webSettings.setGeolocationEnabled(true);
        webSettings.setTextZoom(100);
        webview.getSettings().setAllowFileAccess(true);
        webview.getSettings().setAllowContentAccess(true);
        webview.getSettings().setDomStorageEnabled(true);
        webview.setWebViewClient(new WebViewClientDemo());
        webSettings.setCacheMode(WebSettings.LOAD_DEFAULT);

        AndroidInterface androidInterface = new AndroidInterface(this);
        webview.addJavascriptInterface(androidInterface, "AndroidInterface");
        webview.addJavascriptInterface(new NavigateActivityInterface(this), "OpenActivityInterface");
        webview.addJavascriptInterface(new BackActivityInterface(this), "BackActivityInterface");
        webview.addJavascriptInterface(new ShowSnackInterface(this), "ShowSnackMessage");
        webview.addJavascriptInterface(new WebAppInterface(), "Android");
        webview.addJavascriptInterface(new AndroidFunctionActivityInterface(this), "AndroidFunctionActivityInterface");

        webview.loadUrl("file:///android_asset/pages/settings.html");

        webview.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                checkBiometricSupportSwitch();
            }
        });
        webview.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onJsAlert(WebView view, String url, String message, JsResult result) {
                new AlertDialog.Builder(view.getContext())
                        .setTitle("Input error")
                        .setMessage(message)
                        .setPositiveButton("OK", (DialogInterface dialog, int which) -> result.confirm())
                        .setOnDismissListener((DialogInterface dialog) -> result.confirm())
                        .create()
                        .show();
                return true;
            }


            @Override
            public boolean onJsConfirm(WebView view, String url, String message, JsResult result) {
                new AlertDialog.Builder(view.getContext())
                        .setTitle("Confirm delete")
                        .setMessage(message)
                        .setPositiveButton("OK", (DialogInterface dialog, int which) -> result.confirm())
                        .setNegativeButton("Cancel", (DialogInterface dialog, int which) -> result.cancel())
                        .setOnDismissListener((DialogInterface dialog) -> result.cancel())
                        .create()
                        .show();
                return true;
            }

            @Override
            public boolean onJsPrompt(WebView view, String url, String message, String defaultValue, JsPromptResult result) {
                final EditText input = new EditText(view.getContext());
                input.setInputType(InputType.TYPE_CLASS_TEXT);
                input.setText(defaultValue);
                new AlertDialog.Builder(view.getContext())
                        .setTitle("Confirm Delete")
                        .setMessage(message)
                        .setView(input)
                        .setPositiveButton("OK", (DialogInterface dialog, int which) -> result.confirm(input.getText().toString()))
                        .setNegativeButton("Cancel", (DialogInterface dialog, int which) -> result.cancel())
                        .setOnDismissListener((DialogInterface dialog) -> result.cancel())
                        .create()
                        .show();
                return true;
            }


        });

    }



    public void hideOverlay() {
        overlayLayout.setVisibility(View.GONE);
    }
    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == FILECHOOSER_RESULTCODE) {
            if (filePathCallback != null) {
                Uri[] results = null;
                if (resultCode == RESULT_OK && data != null) {
                    String dataString = data.getDataString();
                    if (dataString != null) {
                        results = new Uri[]{Uri.parse(dataString)};
                    }
                }
                filePathCallback.onReceiveValue(results);
                filePathCallback = null;
            }
        } else if (requestCode == SAVE_DOCUMENT_REQUEST_CODE) {
            if (resultCode == RESULT_OK && data != null && data.getData() != null) {
                saveToUri(data.getData());
            } else {
                Toast.makeText(this, "Error exporting", Toast.LENGTH_SHORT).show();
            }
        } else if (requestCode == IMPORT_REQUEST_CODE) {
            if (resultCode == RESULT_OK && data != null && data.getData() != null) {
                importFromUri(data.getData());
            } else {
                Toast.makeText(this, "Error importing file", Toast.LENGTH_SHORT).show();
            }
        }
    }
    public class WebAppInterface {
        @JavascriptInterface
        public void saveFile(String data) {
            dataToSave = data;
            openFilePickerExport();
        }

        @JavascriptInterface
        public void importFile() {
            openFilePickerImport();  // Open file picker for importing JSON data
        }

    }





    private void openFilePickerExport() {
        String currentDate = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
        String fileName = "NotesMasterBackup_" + currentDate + ".json";
        Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType("application/json");
        intent.putExtra(Intent.EXTRA_TITLE, fileName);
        startActivityForResult(intent, SAVE_DOCUMENT_REQUEST_CODE);
    }
    private void openFilePickerImport() {
        Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType("application/json");
        startActivityForResult(intent, IMPORT_REQUEST_CODE);
    }

    private void importFromUri(Uri uri) {
        try {
            InputStream inputStream = getContentResolver().openInputStream(uri);
            if (inputStream != null) {
                BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
                StringBuilder stringBuilder = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    stringBuilder.append(line).append("\n");  // Preserve line breaks
                }
                reader.close();
                inputStream.close();

                String importedData = stringBuilder.toString()
                        .replace("\\", "\\\\")    // Escape backslashes
                        .replace("'", "\\'")       // Escape single quotes
                        .replace("\n", "\\n")      // Escape newlines for JavaScript
                        .replace("\r", "");        // Optional: strip carriage returns

                runOnUiThread(() -> {
                    String jsCode = "handleImportedData('" + importedData + "');";
                    webview.evaluateJavascript(jsCode, null);
                });
            }
        } catch (Exception e) {
            Toast.makeText(this, "Error reading file", Toast.LENGTH_LONG).show();
            e.printStackTrace();
        }
    }


    private void saveToUri(Uri uri) {
        try {
            OutputStream outputStream = getContentResolver().openOutputStream(uri);
            if (outputStream != null) {
                outputStream.write(dataToSave.getBytes());
                outputStream.close();
                Toast.makeText(this, "Backup saved", Toast.LENGTH_SHORT).show();
            } else {
                Toast.makeText(this, "Error", Toast.LENGTH_SHORT).show();
            }
        } catch (Exception e) {
            Toast.makeText(this, "Error saving file", Toast.LENGTH_LONG).show();
            e.printStackTrace();
        }
    }

    public class ShowSnackInterface {
        private final Context mContext;

        public ShowSnackInterface(Context context) {
            this.mContext = context;
        }

        @JavascriptInterface
        public void ShowSnack(final String text, final String time) {
            int duration = Snackbar.LENGTH_SHORT;
            if ("long".equals(time)) {
                duration = Snackbar.LENGTH_LONG;
            } else if ("short".equals(time)){
                duration = Snackbar.LENGTH_SHORT;
            }


            Snackbar snackbar = Snackbar.make(((Activity) mContext).findViewById(android.R.id.content), text, duration);

            View snackbarView = snackbar.getView();



            TextView textView = snackbarView.findViewById(com.google.android.material.R.id.snackbar_text);
            textView.setTextSize(TypedValue.COMPLEX_UNIT_SP, 15);
            Typeface typeface = ResourcesCompat.getFont(mContext, R.font.roboto_medium);
            textView.setTypeface(typeface);


            ViewGroup.LayoutParams params = snackbar.getView().getLayoutParams();
            if (params instanceof ViewGroup.MarginLayoutParams) {
                ViewGroup.MarginLayoutParams marginParams = (ViewGroup.MarginLayoutParams) params;
                marginParams.bottomMargin = 34;
                marginParams.leftMargin = 26;
                marginParams.rightMargin = 26;
                snackbar.getView().setLayoutParams(marginParams);
            }


            snackbar.show();
        }
    }



    private void checkBiometricSupportSwitch() {
        BiometricManager biometricManager = BiometricManager.from(this);

        switch (biometricManager.canAuthenticate()) {
            case BiometricManager.BIOMETRIC_SUCCESS:
                break;

            case BiometricManager.BIOMETRIC_ERROR_NO_HARDWARE:
            case BiometricManager.BIOMETRIC_ERROR_HW_UNAVAILABLE:
            case BiometricManager.BIOMETRIC_ERROR_NONE_ENROLLED:
                callNotSupportedJavaScriptFunction();
                break;

            default:
                callNotSupportedJavaScriptFunction();
                break;
        }
    }

    private void callNotSupportedJavaScriptFunction() {

        webview.evaluateJavascript("javascript:notSupported();", null);
    }



    public class NavigateActivityInterface {
        private final Context mContext;

        public NavigateActivityInterface(Context context) {
            this.mContext = context;
        }

        @JavascriptInterface
        public void OpenActivity(final String activityName) {
            Intent intent = null;

            switch (activityName) {
                case "AboutPage":
                    intent = new Intent(mContext, AboutPage.class);
                    break;
                default:
                    Toast.makeText(mContext, "Activity not found", Toast.LENGTH_SHORT).show();
                    return;
            }

            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            mContext.startActivity(intent);

        }
    }


    public class BackActivityInterface {
        private final Activity gActivity;

        public BackActivityInterface(Activity activity) {
            this.gActivity = activity;
        }

        @JavascriptInterface
        public void CloseActivity() {
            gActivity.runOnUiThread(() -> gActivity.onBackPressed());
        }
    }
    public void goBack() {
        runOnUiThread(this::onBackPressed);
    }


    public class AndroidFunctionActivityInterface {
        private SettingsActivity mActivity;

        AndroidFunctionActivityInterface(SettingsActivity activity) {
            mActivity = activity;
        }

        @JavascriptInterface
        public void androidFunction(final String functiontype) {
            mActivity.runOnUiThread(new Runnable() {
                @SuppressLint("ResourceType")
                @RequiresApi(api = Build.VERSION_CODES.O)
                @Override
                public void run() {
                    if (functiontype.equals("hideSurfaceOverlay")){
                            hideOverlay();
                        return;
                    } else if (functiontype.equals("applyAMOLED")) {
                        restartApp();
                        return;
                    }
                }
            });
        }
    }


    private void restartApp() {
        Toast.makeText(this, "App is restarting...", Toast.LENGTH_SHORT).show();

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                Intent intent = new Intent(getApplicationContext(), MainActivity.class);
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                startActivity(intent);
                finish();
            }
        }, 500);
    }


    public class AndroidInterface {
        private SettingsActivity mActivity;

        AndroidInterface(SettingsActivity activity) {
            mActivity = activity;
        }

        @JavascriptInterface
        public void updateStatusBarColor(final String colorStatus, final String colorNav, final String UiFlag, final String FlagAnim) {
            mActivity.runOnUiThread(new Runnable() {
                @SuppressLint("ResourceType")
                @RequiresApi(api = Build.VERSION_CODES.O)
                @Override
                public void run() {
                    int statusBarColor;
                    int navigationBarColor;
                    int systemUiVisibilityFlags = View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR | View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;

                    if (colorStatus != null && !colorStatus.isEmpty()) {
                        statusBarColor = Color.parseColor(colorStatus);
                        navigationBarColor = Color.parseColor(colorNav);
                        if ("0colorOnly".equals(UiFlag)){
                            systemUiVisibilityFlags = 0;
                        }else if ("1".equals(UiFlag)) {
                            systemUiVisibilityFlags = View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR | View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
                            setAppTheme(mActivity, false);
                        } else {
                            systemUiVisibilityFlags = 0;
                            setAppTheme(mActivity, true);
                        }
                    } else {
                        Toast.makeText(mActivity, "not found", Toast.LENGTH_SHORT).show();
                        return;
                    }

                    int currentStatusBarColor = mActivity.getWindow().getStatusBarColor();
                    int currentNavigationBarColor = mActivity.getWindow().getNavigationBarColor();

                    int animationDuration = 0;
                    try {
                        animationDuration = Integer.parseInt(FlagAnim);
                    } catch (NumberFormatException e) {
                        animationDuration = 0;
                    }


                    ObjectAnimator statusBarAnimator = ObjectAnimator.ofObject(
                            mActivity.getWindow(),
                            "statusBarColor",
                            new ArgbEvaluator(),
                            currentStatusBarColor,
                            statusBarColor
                    );

                    statusBarAnimator.setDuration(animationDuration);
                    statusBarAnimator.start();

                    ObjectAnimator navBarAnimator = ObjectAnimator.ofObject(
                            mActivity.getWindow(),
                            "navigationBarColor",
                            new ArgbEvaluator(),
                            currentNavigationBarColor,
                            navigationBarColor
                    );

                    navBarAnimator.setDuration(animationDuration);
                    navBarAnimator.start();

                    mActivity.getWindow().setNavigationBarColor(navigationBarColor);

                    View decorView = mActivity.getWindow().getDecorView();
                    decorView.setSystemUiVisibility(systemUiVisibilityFlags);

                }
            });
        }
    }

    private class WebViewClientDemo extends WebViewClient {
        @Override
        //Keep webview in app when clicking links
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            view.loadUrl(url);
            return true;
        }
    }

    public void setAppTheme(Context context, boolean isDarkMode) {
        // Save theme preference
        SharedPreferences prefs = context.getSharedPreferences("theme_prefs", Context.MODE_PRIVATE);
        prefs.edit().putBoolean("theme_mode", isDarkMode).apply();

        // Apply the theme
        if (isDarkMode) {
            AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES);
            context.setTheme(R.style.ThemeMainBlackDark);
        } else {
            AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);
            context.setTheme(R.style.ThemeMainBlackLight);
                View decorView = getWindow().getDecorView();
                decorView.setSystemUiVisibility(
                        View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR | View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR
                );
        }
    }

}


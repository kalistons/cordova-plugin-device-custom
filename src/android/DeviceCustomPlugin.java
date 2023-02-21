package cordova.plugin.custom;

import android.os.Environment;
import android.os.StatFs;
import android.provider.Settings;
import android.os.Build;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaInterface;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * This class echoes a string called from JavaScript.
 */
public class DeviceCustomPlugin extends CordovaPlugin {
    public static final String TAG = "DeviceCustomPlugin";
    public DeviceCustomPlugin(){}

    /**
     * Sets the context of the Command. This can then be used to do things like
     * get file paths associated with the Activity.
     *
     * @param cordova The context of the main Activity.
     * @param webView The CordovaWebView Cordova is running in.
     */
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {

        if ("getDeviceInfo".equals(action)) {
            JSONObject r = new JSONObject();

            r.put("memUsed", this.getMemUsed());
            r.put("memMax", this.getMemMax());
            r.put("diskFree", this.getDiskFree());
            r.put("diskTotal", this.getDiskTotal());
            r.put("realDiskFree", this.getRealDiskFree());
            r.put("realDiskTotal", this.getRealDiskTotal());
            r.put("model", android.os.Build.MODEL);
            r.put("operatingSystem", "android");
            r.put("osVersion", android.os.Build.VERSION.RELEASE);
            r.put("platform", this.getPlatform());
            r.put("manufacturer", android.os.Build.MANUFACTURER);
            r.put("isVirtual", this.isVirtual());
            r.put("name", this.getName());

            callbackContext.success(r);
            return true;
        }
        return false;
    }
    public long getMemUsed() {
        final Runtime runtime = Runtime.getRuntime();
        final long usedMem = (runtime.totalMemory() - runtime.freeMemory());
        return usedMem;
    }
	
	public long getMemMax() {
        final Runtime runtime = Runtime.getRuntime();
        final long maxMem = runtime.totalMemory();
        return maxMem;
    }

    public long getDiskFree() {
        StatFs statFs = new StatFs(Environment.getRootDirectory().getAbsolutePath());
        return statFs.getAvailableBlocksLong() * statFs.getBlockSizeLong();
    }

    public long getDiskTotal() {
        StatFs statFs = new StatFs(Environment.getRootDirectory().getAbsolutePath());
        return statFs.getBlockCountLong() * statFs.getBlockSizeLong();
    }

    public long getRealDiskFree() {
        StatFs statFs = new StatFs(Environment.getDataDirectory().getAbsolutePath());
        return statFs.getAvailableBlocksLong() * statFs.getBlockSizeLong();
    }

    public long getRealDiskTotal() {
        StatFs statFs = new StatFs(Environment.getDataDirectory().getAbsolutePath());
        return statFs.getBlockCountLong() * statFs.getBlockSizeLong();
    }

    private String getPlatform() {
        return "android";
    }

    public boolean isVirtual() {
        return android.os.Build.FINGERPRINT.contains("generic") || android.os.Build.PRODUCT.contains("sdk");
    }

    public String getName() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N_MR1) {
            return Settings.Global.getString(this.cordova.getActivity().getContentResolver(), Settings.Global.DEVICE_NAME);
        }

        return null;
    }



}

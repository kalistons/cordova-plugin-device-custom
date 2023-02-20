export interface DeviceInfo {
    /**
     * The name of the device. For example, "kaliston's iPhone".
     *
     * This is only supported on iOS and Android 7.1 or above.
     *
     * @since 1.0.0
     */
    name?: string;

    /**
     * The device model. For example, "iPhone13,4".
     *
     * @since 1.0.0
     */
    model: string;

    /**
     * The device platform (lowercase).
     *
     * @since 1.0.0
     */
    platform:  'android' | 'web';

    /**
     * The operating system of the device.
     *
     * @since 1.0.0
     */
    operatingSystem: 'android';

    /**
     * The version of the device OS.
     *
     * @since 1.0.0
     */
    osVersion: string;

    /**
     * The manufacturer of the device.
     *
     * @since 1.0.0
     */
    manufacturer: string;

    /**
     * Whether the app is running in a simulator/emulator.
     *
     * @since 1.0.0
     */
    isVirtual: boolean;

    /**
     * Approximate memory used by the current app, in bytes. Divide by
     * 1048576 to get the number of MBs used.
     *
     * @since 1.0.0
     */
    memUsed?: number;

    /**
     * How much free disk space is available on the normal data storage
     * path for the os, in bytes.
     *
     * On Android it returns the free disk space on the "system"
     * partition holding the core Android OS.
     * On iOS this value is not accurate.
     *
     * @deprecated Use `realDiskFree`.
     * @since 1.0.0
     */
    diskFree?: number;

    /**
     * The total size of the normal data storage path for the OS, in bytes.
     *
     * On Android it returns the disk space on the "system"
     * partition holding the core Android OS.
     *
     * @deprecated Use `realDiskTotal`.
     * @since 1.0.0
     */
    diskTotal?: number;

    /**
     * How much free disk space is available on the normal data storage, in bytes.
     *
     * @since 1.1.0
     */
    realDiskFree?: number;

    /**
     * The total size of the normal data storage path, in bytes.
     *
     * @since 1.1.0
     */
    realDiskTotal?: number;
}
declare var device: DeviceInfo;
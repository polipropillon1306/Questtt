# Android Studio release path for infrequent uploads

Publishing Test releases are generated through Android Studio's signed Android App Bundle flow instead of a custom command-line release pipeline. Uploads are expected to be infrequent, so the lower setup cost of Android Studio is preferred over scripting the full release path, while command-line web build and Capacitor sync remain useful preflight checks.

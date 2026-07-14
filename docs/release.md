# Android Studio Release Checklist

This project uses Android Studio for infrequent Publishing Test uploads.

## Preflight

1. Run `npm ci`.
2. Run `npm run build`.
3. Run `npx cap sync android`.
4. Open `android/` in Android Studio.

Optional command-line sanity check:

```sh
cd android
JAVA_HOME=/opt/android-studio/jbr ./gradlew assembleDebug
```

The system JDK on this machine is Java 26, which fails the Android Gradle build during the JDK image transform. Android Studio's bundled JBR works.

## Generate the Play Upload Artifact

1. In Android Studio, choose `Build > Generate Signed App Bundle / APK`.
2. Choose `Android App Bundle`.
3. Select the upload keystore for the existing Play Package `com.inaya.athenaspacequest`.
4. Choose the `release` variant.
5. Generate the signed AAB.
6. Upload the generated AAB manually to the existing Play Console app.

## Notes

- Do not commit upload keystores, AABs, or APKs.
- For later uploads, increase `versionCode` in `android/app/build.gradle` before generating a new AAB.
- Keep a private backup of the upload keystore and its passwords outside this repository.

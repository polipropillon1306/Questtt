---
status: superseded by ADR-0003
---

# Release signing from untracked keystore properties

Publishing Test releases use Gradle signing configured from an untracked `android/keystore.properties` file. This keeps the Play Upload Artifact reproducible from the command line while keeping signing passwords out of tracked Gradle files and avoiding manual Android Studio-only release steps.

This decision was superseded when releases were narrowed to infrequent Android Studio uploads.

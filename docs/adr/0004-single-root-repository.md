# Single root repository

Athena Space Quest uses one root repository containing both the web game and the Android Capacitor project. The previous nested `android/.git` repository shape is not kept because the Play upload path depends on source files across both roots, and one repository makes release preparation easier to review.

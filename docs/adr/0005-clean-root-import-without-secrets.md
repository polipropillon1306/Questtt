# Clean root import without secrets

The new root repository starts from the current web and Android source files instead of preserving the nested `android/.git` history. Signing material and generated release artifacts are excluded from the root repository so the first commit represents rebuildable source, not local upload secrets or build outputs.

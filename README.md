# Collaboration Guide for CarMatch

This guide explains how to safely pull, edit, and push changes to the CarMatch repository.

---

## ✅ First Time Setup

If you haven't cloned the repo yet:

```bash
git clone https://github.com/alyaridwan27/CarMatch.git
cd CarMatch
```

---

## 🔁 Daily Workflow (Pull, Edit, Push)

If you've already cloned the repo before:

1. **Pull the latest changes**:
   ```bash
   git pull
   ```

2. **Make your edits** in the project.
to run the app just npx expo start

3. **Check what you changed (optional)**:
   ```bash
   git status
   ```

4. **Stage your changes**:
   ```bash
   git add .
   ```

5. **Commit your changes**:
   ```bash
   git commit -m "Describe what you changed"
   ```

6. **Push your changes**:
   ```bash
   git push
   ```

---

## ⚠️ Tips to Avoid Merge Conflicts

- Always run `git pull` before starting your work.
- Coordinate with others to avoid editing the same files at the same time.
- If you run into merge conflicts, feel free to ask for help!

# HARSHU FF Tools - GitHub Auto Build Setup

## Step 1: GitHub Account Banao
1. https://github.com/signup pe jao
2. Email se sign up karo
3. Verify email

## Step 2: Repository Banao
1. GitHub pe "New Repository" dabao
2. Name: `harshu-ff-tools`
3. "Create Repository" dabao

## Step 3: Expo Token Setup
1. https://expo.dev/settings/access-tokens pe jao
2. "Create Token" dabao
3. Token copy karo

## Step 4: GitHub Secret Add Karo
1. GitHub repo mein jao → Settings → Secrets and variables → Actions
2. "New repository secret" dabao
3. Name: `EXPO_TOKEN`
4. Secret: Token paste karo jo Step 3 mein mila
5. "Add secret" dabao

## Step 5: Code Upload Karo
1. GitHub repo mein jao
2. "Uploading an existing file" option
3. ZIP extract karke sab files upload karo
4. Ya terminal se:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/harshu-ff-tools.git
   git push -u origin main
   ```

## Step 6: Auto Build Start Hoga!
1. Code push hote hi GitHub Actions chalega
2. Actions tab mein dekh sakte ho progress
3. 5-10 min mein build complete
4. Expo dashboard se APK download karo

## APK Download Kahan Se?
Build complete hone ke baad:
- https://expo.dev/accounts/YOUR_USERNAME/projects/harshu-ff-tools/builds
- Ya GitHub Actions logs mein link milega

## Future Updates
Jab bhi code change karna ho:
```bash
git add .
git commit -m "Update"
git push
```
Automatic nayi APK ban jayegi!

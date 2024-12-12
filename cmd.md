1. Commands for Your Friend to Clone and Start Working
Your friend needs to clone your repository to their local machine.

bash
Copy code
# Clone the repository from GitHub to their local machine
git clone https://github.com/<your-username>/<your-repo>.git

# Navigate to the cloned repository directory
cd <your-repo>

# Create a new branch to work on (this avoids modifying the main branch directly)
git checkout -b new-feature
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
2. Commands for Your Friend to Modify and Upload Code
bash
Copy code
# Make changes to the code locally

# Stage the changes (add modified files to the staging area)
git add .

# Commit the changes with a descriptive message
git commit -m "Add feature: Description of the changes"

# Push the changes to the repository (new branch)
git push origin new-feature

-----Please Dont use below Commands----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

3. Commands for You to Pull and Update Your Code
bash
Copy code
# Fetch the latest changes from the repository
git fetch origin

# Pull changes from the main branch to your local main branch
git pull origin main

# If your friend created a new branch and you want to work on it:
git checkout new-feature  # Switch to the branch they created

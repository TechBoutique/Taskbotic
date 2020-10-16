clear
echo " Executing necessary scripts " 
git config --local core.hooksPath .githooks/    
cd .githooks 
chmod 777 pre-commit 
chmod 777 pre-push
echo " We are done here"
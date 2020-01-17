check diff between remote and local

git fetch test ; git diff --name-only test test/test 

git config --global --unset user.name
git config --global --unset user.email
If you have more variables for one config you can use:

git config --global --unset-all user.name

git branch test origin/test

git branch test origin/test
git checkout test

If you wish to set tracking information for this branch you can do so with:
    git branch --set-upstream-to=origin/<branch> test

    git branch --set-upstream-to=origin/test test

 git config -l
user.name=Tyler Glenski
user.email=tglenski1@gmail.com
core.repositoryformatversion=0
core.filemode=true
core.bare=false
core.logallrefupdates=true
remote.origin.url=https://github.com/Group48LLC/multi_map.git
remote.origin.fetch=+refs/heads/*:refs/remotes/origin/*
branch.master.remote=origin
branch.master.merge=refs/heads/master
remote.test.url=https://github.com/Group48LLC/multi_map/tree/test.git
remote.test.fetch=+refs/heads/*:refs/remotes/test/*
dev@dev-VirtualBox:~/dev/react/multi_map$ 

git config --global --unset 
git config --global --unset remote.test.url
git config --global --unset remote test

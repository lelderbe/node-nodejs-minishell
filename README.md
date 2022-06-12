# File Manager

This is my minishell with some available commands listed below.

Task here: https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/file-manager/assignment.md

![image](https://user-images.githubusercontent.com/29270751/173243116-c888b38f-7969-42d4-8feb-9589bed7db8e.png)

## 🚀 How to run

```
npm start -- --username=your_username
```

Minishell uses some color output, if color text is not readable for you,  
you can disable colors with **--colors=disable** option.

## 💥 Features supported

-   absolute and relative paths
-   filenames and folders with spaces - "./Some folder/nice file.txt" (but don't get crazy 😏)
-   builtin 'help' command

## 💻 Available commands

-   help - show all commands

#### Navigation & working directory (nwd):

-   up - go upper from current directory
-   cd path_to_directory - go to dedicated folder from current directory
-   ls - list all files and folders in current directory and print it to console

#### Basic operations with files:

-   add new_file_name - create empty file in current working directory
-   cat path_to_file - read file and print it's content in console
-   rn path_to_file new_filename - rename file
-   cp path_to_file path_to_new_directory - copy file
-   mv path_to_file path_to_new_directory - move file
-   rm path_to_file - delete file

Examples:

```
minishell> add f1.txt
minishell> cat folder1/f2.txt
minishell> rn folder1/f2.txt f3.txt
minishell> cp folder1/f2.txt ./folder2
minishell> mv folder1/f2.txt ./folder3
minishell> rm folder1/f2.txt
```

Try to use file names with spaces:

```
minishell> add "nice file.txt"
minishell> cat "long name folder/who is there.txt"
```

#### Operating system info:

-   os --EOL - get default system End-Of-Line
-   os --cpus - get host machine CPUs info
-   os --homedir - get home directory
-   os --username - get current system user name
-   os --architecture - get CPU architecture for which Node.js binary has compiled

Example:

```
minishell> os --EOL --homedir --username
```

#### Hash calculation:

-   hash path_to_file - calculate hash for file and print it into console

Example:

```
minishell> hash /Documents/data.doc
```

#### Compress and decompress operations:

-   compress path_to_file path_to_new_file - compress file (using Brotli algorytm)
-   decompress path_to_file path_to_new_file - decompress file (using Brotli algorytm)

Examples:

```
minishell> compress file.txt file.br
minishell> decompress file.br /Documents/new.txt
```

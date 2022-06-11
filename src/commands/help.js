export const help = async (cmd) => {
	console.log(`
Navigation & working directory (nwd):
 up - go upper from current directory
 cd path_to_directory - go to dedicated folder from current directory
 ls - list all files and folder in current directory and print it to console

Basic operations with files:
 add new_file_name - create empty file in current working directory
 cat path_to_file - read file and print it's content in console
 rn path_to_file new_filename - rename file
 cp path_to_file path_to_new_directory - copy file
 mv path_to_file path_to_new_directory - move file
 rm path_to_file - delete file

Operating system info:
 os --EOL - get default system End-Of-Line
 os --cpus - get host machine CPUs info
 os --homedir - get home directory
 os --username - get current system user name
 os --architecture - get CPU architecture for which Node.js binary has compiled

Hash calculation:
 hash path_to_file - calculate hash for file and print it into console

Compress and decompress operations:
 compress path_to_file path_to_new_file - compress file (using Brotli algorytm)
 decompress path_to_file path_to_new_file - decompress file (using Brotli algorytm)
`);
};

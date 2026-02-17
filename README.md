# Todo:
<img width="2041" height="1222" alt="image" src="https://github.com/user-attachments/assets/f1acf759-a53c-42b8-954e-32fc5139ca68" />



# Requirements:

### Composer (Package manager)

### vlucas/phpdotenv package:
~~~
cd /var/www/html/

composer require vlucas/phpdotenv
~~~

# AI Attributions:

## Mason
Used Claude to understand the login.php provided by Professor Leinecker. During this, Claude recommended moving sensitive data to a .env file. After this suggestion, I read about how to set up a .env file in PHP and the security benefits. I also discussed the necessary setup and server structure for the .env file with Claude.

I also used Claude to help understand why I cannot push an empty folder to a github repository as well as to find a workaround to this. The workaround was using .gitkeep files.

Used Claude to understand how to set variables to be optional in PHP, as well as setting variables in function calls by name. Also used Claude to help understand Login.PHP and AddColor.PHP files from Colors Lab, which led to using Claude to help debug and validate a more streamlined approach to handling the responses in the PHP. Finally, used Claude to validate that the new method used for handling responses was secure and did not introduce any security vulnerabilities.

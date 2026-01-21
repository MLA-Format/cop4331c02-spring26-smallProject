# Todo:
### Front-end (List not complete)
- [ ] Bind frontend to APIs. (Consult SwaggerHub documentation)
- [ ] Delete confirmation for contact deletion.
- [ ] Contact management UI.
### Database
- [ ] Create database. (Gabriel)
- [ ] Create user table. (Gabriel)
- [ ] Create contacts table (minimum data: name, email, phone, date).
- [ ] Per contact, link to user using foreign key.
- [ ] Create admin user (for APIs) (Gabriel)
- [ ] Entity relationship diagram (ERD)
### Backend
- [ ] .js File (Mason - In Progress)
- [ ] User creation/register API (Mason)
- [ ] User login API (Awaiting sql/debugging - 01/17/26) (Mason)
- [ ] Contact creation API. (Adnan)
- [ ] Contact read API + contact search API w/ partial match (Cannot cache all results) (Adnan)
- [ ] Contact update API. (Adnan)
- [ ] Contact delete API. (Adnan)
- [ ] SwaggerHub testing.
### Presentation (More information on assignment description on Canvas)
- [ ] Title page
- [ ] Members page
- [ ] Project description (What it is, how it was developed, etc.)
- [ ] Required charts (Gantt, Use Case Diagram, ERD)
- [ ] What did/didn't go well.
- [ ] Project Demo
- [ ] Swaggerhub demo of APIs (no more than 2)
### Etc.
- [ ] Test on phones.
- [ ] Test on different browser pane sizes.
- [ ] Validate functionality on server.
- [ ] Lighthouse report.
- [ ] Check website on UCF campus.
- [ ] Add slideshow + all supporting media to USB drive.
- [ ] Submit all deliverables on Canvas.

# Requirements:

### Composer (Package manager)

### vlucas/phpdotenv package:
~~~
cd /var/www/html/

composer require vlucas/phpdotenv
~~~

# AI Attributions:

### Mason
Used Claude to understand the login.php provided by Professor Leinecker. During this, Claude recommended moving sensitive data to a .env file. After this suggestion, I read about how to set up a .env file in PHP and the security benefits. I also discussed the necessary setup and server structure for the .env file with Claude.

I also used Claude to help understand why I cannot push an empty folder to a github repository as well as to find a workaround to this. The workaround was using .gitkeep files.

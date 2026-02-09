# Todo:
### Front-end (List not complete)
- [ ] Bind frontend to APIs. (Consult SwaggerHub documentation)
- [ ] Delete confirmation for contact deletion.
- [x] Sign in page (Emily)
- [x] Login Page (Emily)
- [x] Landing Page (Emily)
- [ ] Contact Management Page (Michelin)
### Database
- [x] Create database. (Gabriel)
- [x] Create user table. (Gabriel)
- [x] Create contacts table (minimum data: name, email, phone, date).
- [ ] Per contact, link to user using foreign key. (Gabriel)
- [x] Create admin user (for APIs) (Gabriel) (1-27-26)
- [ ] Entity relationship diagram (ERD)
### Backend
- [ ] .js File (Emily/Mason/Michelin - In Progress) (1/19 - ?)
- [x] User creation/register API (Mason)
- [x] User login API (Mason)
- [x] Contact creation API. (Adnan)
- [ ] Contact read API + contact search API w/ partial match (Cannot cache all results) (Adnan)
- [ ] Contact update API. (Adnan)
- [x] Contact delete API. (Adnan)
- [ ] SwaggerHub testing.
- [ ] Password Hashing (Mason)
### Presentation (More information on assignment description on Canvas)
- [ ] Title page
- [ ] Members page
- [ ] Project description (What it is, how it was developed, etc.)
- [ ] Required charts (Gantt, Use Case Diagram, ERD)
- [ ] What did/didn't go well.
- [ ] Project Demo
- [ ] Swaggerhub demo of APIs (no more than 2)
### Etc.
- [x] Bind website to domain (Mason)
- [ ] Test on phones.
- [ ] Test on different browser pane sizes.
- [ ] Validate functionality on server.
- [ ] Lighthouse report.
- [ ] Color Pallete
- [ ] Check website on UCF campus.
- [ ] Add slideshow + all supporting media to USB drive.
- [ ] Submit all deliverables on Canvas.


```mermaid
gantt
  title Small Project Gantt Chart
  dateFormat MM-DD-YYYY
  section Frontend
  Login pg           :active, 01-19-2026, 20d
  Sign in pg         :active, 01-19-2026, 20d
  Landing pg         :active, 01-19-2026, 20d
  Contact pg         :active, 01-27-2026, 12d
  Bind to APIs :active, 01-29-2026, 9d
  Delete confirm  :crit, 01-13-2026, 1d
  .js File             :active, 01-20-2026, 9d
  section SQL
  Create DB      :01-22-2026, 4d
  User table    :01-22-2026, 4d
  Contacts table :01-22-2026, 4d
  Link contacts :01-22-2026, 4d
  Admin user    :01-27-2026, 1d
  ERD                  :02-2-2026, 2d
  section Backend
  User create API    :01-22-2026, 7d
  User login API       :01-15-2026, 14d
  Contact create API :01-23-2026, 13d
  Contact read API     :active, 01-27-2026, 12d
  Contact update API   :active, 01-27-2026, 12d
  Contact delete API   :01-23-2026, 15d
  SwaggerHub   :crit, 01-13-2026, 1d
  PWD Hashing :02-03-2026, 4d
  section Presentation
  Title pg           :crit, 01-13-2026, 1d
  Members pg         :crit, 01-13-2026, 1d
  Project desc  :crit, 01-13-2026, 1d
  Charts      :crit, 01-13-2026, 1d
  What went well :crit, 01-13-2026, 1d
  Demo         :crit, 01-13-2026, 1d
  Swagger demo      :crit, 01-13-2026, 1d
  section Etc
  Bind to Domain :01-30-2026, 1d
  Test on phones       :crit, 01-13-2026, 1d
  Test on browsers   :crit, 01-13-2026, 1d
  Validate server   :crit, 01-13-2026, 1d
  Lighthouse    :crit, 01-13-2026, 1d
  Color Pallete    :crit, 01-13-2026, 1d
  Check at UCF  :crit, 01-13-2026, 1d
  USB drive     :crit, 01-13-2026, 1d
  Submit Canvas     :crit, 01-13-2026, 1d

```
Note: Red items have not been started. Blue items are in progress. Gray items are complete.


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

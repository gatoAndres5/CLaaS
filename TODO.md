# 1
'Set Users' button on configuration page sends user to experiment users page. Not sure if that was intended.
# 2 
Once backend is setup, and slides can be saved and correspond with experiments, they need to be displayed in experiment-display.component.html and experiment-display.component.ts. This included functionality with 'Reboot VM' button. This also means modifying experiment-instructions-dialog.component since this is the component that is displayed when the user clicks show/hide experiment instructions. This component will actually display the slides.
# 3 
Once passwords and login process is implemented in backend, make sure that password hashing is used.
# 4
On a file like user-page.components, there are many boolean conditions for displaying user messages. I was not able to check every condition to ensure that each one is displayed or not displayed properly. Something to eventually check.
# 5 
Once server is in place, elements in user like ipAddress and regStatus need to be updated. Right now the id value in user is stricly for the user array, has nothing to do with the user information.
# 6 
As I included on service files, the content need to be connected to backend file not local storage.
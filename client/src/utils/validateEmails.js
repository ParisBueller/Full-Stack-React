//email validation regular expression
const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default (emails) => {
    //split our emails(recipient) list at the comma
    //map through the list and for each email inside
    //.trim() any whitespace in the email, then
    //.filter() out the emails that are invalid
    //by testing them against our regular expression
    const invalidEmails = emails.split(',').map(email => email.trim()).filter(email => re.test(email) === false);

    //if there are invalid emails, present which are invalid to the user
    if(invalidEmails.length) {
        return `These emails are invalid: ${invalidEmails}`;
    }
    //if there are none, return
    return;
};
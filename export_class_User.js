export class User {
    constructor(name) {
        this.name = name
        this.loggedIn = false
        this.lastLoggedInAt = null
    }   
  
    isLoggedIn() {
        return this.loggedIn;
    }
    
    getLastLoggedInAt() {
        return this.lastLoggedInAt;
    }
    
    logIn() {
        return new Promise(resolve => {
              resolve(()=>{  
                this.loggedIn = true;
                this.lastLoggedInAt = new Date();
              })
        })
    }
    
    logOut() {
        this.loggedIn = false;
        return new Promise(resolve => resolve(true))
    }
  
    getName() {
        return this.name;
    }
    
    setName(name) {
        this.name = name
    }
  
    canEdit(comment) {
        const author = comment.getAuthor();
        return author.getName() === this.name;
    }
    
    canDelete(comment) {
      return false;
    }
  }

  export class Moderator extends User {
    canDelete(comment) {
        return true;
    }
  }
  
  export class Admin extends Moderator {
      canEdit(comment) {
          return true;
      }
  }
  
  
  export class Comment {
    constructor(author, message, repliedTo) {
        this.author = author;
        this.message = message;
        this.repliedTo = repliedTo;
        this.createdAt = new Date();
    }
   
    getMessage() {
        return this.message;
    }
    
    setMessage(message) {
        this.message = message;
    }
    
    getCreatedAt() {
       return this.createdAt;
    }
    
    getAuthor() {
        return this.author;
    }
    
    getRepliedTo() {
        return this.repliedTo;
    }
    
    toString() {
        const message = this.message + ' by ' + this.author.getName();
        if (!this.repliedTo) {
           return message;
        }
        const replyAuthor = this.repliedTo.getAuthor()
        return message + ' (replied to ' + replyAuthor.getName() + ')';
    }
  }
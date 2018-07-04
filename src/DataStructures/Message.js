export default class Message {
    constructor() {
        this.id = '';
        this.message = '';
        this.username = '';
        this.attachments = {}
    }

    addImage(img) {
        this.attachments.image = img;
    }

    addLink(link) {
        this.attachments.link = link;
    }
}
module.exports = [
    {
        'name': 'troy vassalotti',
        get url() {return `/`}
    },
    {
        'name': 'posts',
        get url() {return `/${this.name}/`}
    },
    {
        'name': 'projects',
        get url() {return `/${this.name}/`}
    },
    {
        'name': 'music',
        get url() {return `/${this.name}/`}
    },
    {
        'name': 'about',
        get url() {return `/${this.name}/`}
    }
]
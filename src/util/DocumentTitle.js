const setDocumentTitle = (title: string) => {
    if (document.title) {
        document.title = title;
    }
}

export default setDocumentTitle;
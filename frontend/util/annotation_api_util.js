export const createAnnotation = (annotation) => {
    debugger
    return $.ajax({
        method: 'POST',
        url: 'api/annotations',
        data: { annotation }
    });
};

export const fetchAnnotation = (id) => {
    return $.ajax({
        method: 'GET',
        url: `api/annotations/${id}`,
    });
};

export const fetchAnnotations = () => {
    return $.ajax({
        method: 'GET',
        url: `api/annotations`,
    });
};


export const alterAnnotation = (annotation) => {
    return $.ajax({
        method: 'PATCH',
        url: `api/annotations/${annotation.id}`,
        data: { annotation }
    });
};

export const deleteAnnotation = (id) => {
    return $.ajax({
        method: 'DELETE',
        url: `api/annotations/${annotation.id}`
    })
}
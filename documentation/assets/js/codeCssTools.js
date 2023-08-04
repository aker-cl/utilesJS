const transformHTML = (html) => {
    return html.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

document.querySelector('#switchCode').innerHTML = 
transformHTML(
`<label class="check-switch check-switch-2"> // check-switch-1 | check-switch-2 | check-switch-3
    <input type="checkbox" id="check-switch">
    <span class="slider round"></span>
</label>`);

document.querySelector('#modalCode').innerHTML = 
transformHTML(
`<div class="modal fade left-modal" id="modalLeft" aria-labelledby="exampleModalLabel" aria-hidden="true">
    // class left-modal | right-modal
    <div class="modal-dialog modal-dialog-lateral modal-lg" style="max-width: 30%">
        // class modal-dialog-lateral (max-width style optional)
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                ...
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>`);
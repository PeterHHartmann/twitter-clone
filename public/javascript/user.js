const toggle_modal = (modal_id) => {
    document.getElementById(modal_id).classList.toggle('hidden');
};

document.getElementById('modal-bg').addEventListener('click', (e) => {
    toggle_modal('modal-mount');
    document.getElementById('edit-profile-modal').classList.add('hidden');
    const modal_content = document.getElementById('edit-tweet-modal');
    modal_content.classList.add('hidden')
    modal_content.innerHTML = '';
    modal_content.parentNode.classList.add('hidden');
});

try {
    document.getElementById('edit-profile').addEventListener('click', (e) => {
        e.preventDefault();
        toggle_modal('modal-mount')
        toggle_modal('edit-profile-modal')
    });
} catch {}
    
document.getElementById('close-btn').addEventListener('click', (e) => {
    e.preventDefault()
    document.getElementById('edit-profile-form').reset();
    toggle_modal('modal-mount')
    toggle_modal('edit-profile-modal')
});

document.getElementById('banner-input').addEventListener('change', (e) => {
    const image = document.getElementById('current-banner');
    image.src = URL.createObjectURL(e.target.files[0]);
});

document.getElementById('pfp-input').addEventListener('change', (e) => {
    const image = document.getElementById('current-pfp');
    image.src = URL.createObjectURL(e.target.files[0])

});

document.getElementById('edit-profile-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = new FormData()
    const banner_img = document.getElementById('banner-input').files[0]
    if (banner_img){data.append('banner', banner_img)}
    const pfp_img = document.getElementById('pfp-input').files[0]
    if (pfp_img){data.append('pfp', pfp_img)}
    const user_name = document.getElementById('user_name_input').value
    data.append('display_name', document.getElementById('display_name_input').value)
    data.append('bio', document.getElementById('bio_input').value)
    
    const response = await fetch(`/user/edit/${user_name}`, {
        method: 'POST',
        body: data
    })
    
    if (response.ok) {
        location.reload(true)
    }
    
});
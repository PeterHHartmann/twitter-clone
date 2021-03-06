const prepare_tweet_edit = (edit_btn) => {
    edit_btn.addEventListener('click', () => {
        const tweet = document.querySelector(`#tweetid-${edit_btn.dataset.tweet_id}`).cloneNode(true); 
        const textarea = document.createElement('textarea')
        textarea.maxLength = 280;
        textarea.rows = 1;
        try {
            textarea.value = tweet.querySelector('.tweet-text').innerHTML.trim()
            textarea.addEventListener('input', (e) => auto_grow(e.target))
            tweet.querySelector('.tweet-text').innerHTML = '';
            tweet.querySelector('.tweet-text').appendChild(textarea)
        } catch { }
        tweet.querySelector('#tweet-settings').remove();
        const save_btn = document.createElement('button');
        save_btn.className = 'btn-dark';
        save_btn.innerText = 'Save';
        const modal = document.getElementById('modal-mount')
        modal.classList.remove('hidden')
        const modal_content = document.getElementById('edit-tweet-modal');
        modal_content.classList.remove('hidden')
        modal_content.append(tweet)
        const tweet_id = tweet.dataset.tweet_id
        save_btn.addEventListener('click', async (e) => {
            e.preventDefault();
            data = {
                tweet_text: textarea.value
            }
            const response = await fetch(`/tweet/${tweet_id}`, {
                method: 'PUT',
                body: JSON.stringify(data)
            })

            if (response.ok){
                tweet.id = '';
                const actual_tweet = document.querySelector(`#tweetid-${tweet_id}`);
                try {                    
                    actual_tweet.querySelector('.tweet-text').innerHTML = data.tweet_text
                } catch { }
            }
            modal_content.innerHTML = '';
            modal.classList.add('hidden')
        });
        tweet.querySelector('.tweet-header').appendChild(save_btn)
        const delete_btn = document.createElement('button');
        delete_btn.className = 'btn-light';
        delete_btn.innerText = 'Delete tweet';
        delete_btn.addEventListener('click', async () => {
            const response = await fetch(`/tweet/${tweet_id}`, {
                method: 'DELETE',
            })
            if (response.ok){
                tweet.id = '';
                const actual_tweet = document.querySelector(`#tweetid-${tweet_id}`);
                actual_tweet.remove()
            }
            modal_content.innerHTML = '';
            modal.classList.add('hidden')
        });
        tweet.appendChild(delete_btn);
    });
}

window.addEventListener('load', (e) => {
    for ( let edit_btn of document.querySelectorAll('#tweet-settings')){
        prepare_tweet_edit(edit_btn)
    };
});
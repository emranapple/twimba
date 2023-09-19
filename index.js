import { tweetsData } from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'
const feedEL = document.getElementById('feed')





document.addEventListener('click', function (e) {
    if (e.target.dataset.heart) {
        handleLikeClick(e.target.dataset.heart)
    } 
    else if (e.target.dataset.retweet) {
        handleRetweet(e.target.dataset.retweet)
    } 
    else if(e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target.id === 'tweet-btn') {
        handleReplybtn()
    }

})

function handleLikeClick(tweetId) {
    console.log(tweetId)
    const targetTweetObj = tweetsData.filter(function (tweet) {
        return tweet.uuid === tweetId
    })[0]
    if (targetTweetObj.isLiked) {
        targetTweetObj.likes--
    } else {
        targetTweetObj.likes++
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
}

function handleRetweet(tweetId) {
    const targetTweetObj = tweetsData.filter(function (tweet) {
        return tweet.uuid === tweetId
    })[0]
    if (targetTweetObj.isRetweeted) {
        targetTweetObj.retweets--
    } else {
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render()
}

function handleReplyClick(replyID) {
    document.getElementById(`replies-${replyID}`).classList.toggle('hidden')
}

function handleReplybtn() {
    const tweetInput = document.getElementById('tweet-input')
    if(tweetInput.value) {
        tweetsData.unshift(
            {
                handle: `@Scrimba`,
                profilePic: `images/scrimbalogo.png`,
                likes: 0,
                retweets: 0,
                tweetText: tweetInput.value,
                replies: [],
                isLiked: false,
                isRetweeted: false,
                uuid: uuidv4()
            })
        render()
        tweetInput.value = ''
    }
    
}

function getFeedHtml() {
    let feedHtml = ''
    tweetsData.forEach(function (tweet) {
        let isLikeClass = ''
        let isRetweetedClass = ''
        if (tweet.isLiked) {
            isLikeClass = 'liked'
        }
        if (tweet.isRetweeted) {
            isRetweetedClass = 'retweeted'
        }
        let repliesHtml = ''
        if (tweet.replies.length > 0) {

            tweet.replies.forEach(function (reply) {
                repliesHtml += `
                <div class="tweet-reply">
    <div class="tweet-inner">
        <img src="${reply.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${reply.handle}</p>
                <p class="tweet-text">${reply.tweetText}</p>
            </div>
        </div>
</div>
            `

            })
        }

        feedHtml += `
    <div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots" data-reply = ${tweet.uuid}></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${isLikeClass}" data-heart = ${tweet.uuid}></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${isRetweetedClass}" data-retweet=${tweet.uuid}></i>
                    ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
    <div class='hidden' id="replies-${tweet.uuid}">
        ${repliesHtml}
    </div>   
</div>
 
  `
    })
    return feedHtml

}

function render() {
    feedEL.innerHTML = getFeedHtml()
}

render()
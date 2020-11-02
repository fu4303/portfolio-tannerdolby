const allPosts = [...document.querySelectorAll(".post")]; // convert iterable object (NodeList) to array
console.log(allPosts); // Nodelist of article.post elements

// search the location (broswer window) to search the URL for ?filter=tag 
// use slice to grab only the characters after the equal sign ie (=nunjucks)
const postTag = location.search.slice(location.search.indexOf("=") + 1);

const postList = document.querySelector(".my-posts");
const filterMsg = document.createElement("p");
const clearBtn = document.createElement("a");
const listItem = document.createElement("li");
const em = document.createElement("em");

filterMsg.setAttribute("class", "filter-msg")

clearBtn.innerText = "remove filter";
clearBtn.setAttribute("class", "clear-filter-btn");
clearBtn.setAttribute("href", "/writing/");

if (postTag) {

    // filter the posts nodelist for posts without the searched tag
    let postsWithoutTag = allPosts.filter(post => {
        return JSON.parse(post.dataset.tags).includes(postTag) === false;
    });

    // posts with tag (no use for now)
    let postsWithTag = allPosts.filter(post => {
        return JSON.parse(post.dataset.tags).includes(postTag);
    });

    // visually hide the elements not meeting tag query
    postsWithoutTag.forEach(post => {
        post.setAttribute("hidden", true);
    });

    if (postsWithTag.length === 1) {
        filterMsg.innerText = `${postsWithTag.length} post tagged with ${postTag}`;
    } else {
        filterMsg.innerText = `${postsWithTag.length} posts tagged with ${postTag}`;
    }
    
    listItem.append(filterMsg);
    em.append(clearBtn);
    filterMsg.append(em);
    postList.prepend(listItem);
}
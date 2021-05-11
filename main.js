let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

let loadImage = (src, callback) => {
    let img = document.createElement("img");
    img.onload = () => callback(img);
    img.src = src;
}

let imagePath = (frameNumber, animation) => {
    return "./" + animation +"/" + frameNumber + ".png";
};

let frames  = {
    backward: [1,2,3,4,5,6],
    block: [1,2,3,4,5,6,7,8,9],
    forward: [1,2,3,4,5,6],
    idle : [1,2,3,4,5,6,7,8],
    kick : [1,2,3,4,5,6,7],
    punch: [1,2,3,4,5,6,7],
};

let LoadImages = (callback) => {
    let images = { backward:[], block:[], forward:[], idle:[], kick:[], punch:[] };
    let ImagesToLoad = 0;

    ["backward", "block", "forward", "idle", "kick", "punch"].forEach((animation) => {
        let animationFrames = frames[animation];
        ImagesToLoad = ImagesToLoad + animationFrames.length;

        animationFrames.forEach((frameNumber) => {
            let path = imagePath(frameNumber, animation);

        loadImage(path, (image) => {
            images[animation][frameNumber-1] = image;
            ImagesToLoad = ImagesToLoad - 1;

            if (ImagesToLoad === 0){
            callback(images);
            }
        });
        });
    });
};

let animate = (ctx, images, animation, callback) => {
    images[animation].forEach((image, index) => {
        setTimeout(() => {
            ctx.clearRect(0, 0, 500, 500);
            ctx.drawImage(image, 0, 0, 500, 500);
        }, index * 100);
    });

    setTimeout(callback, images[animation].length * 100);
};


LoadImages((images) => {
    
    let queuedAnimation = [];

    let aux = () => {

        let selectedAnimation;

        if (queuedAnimation.length === 0)
        {
            selectedAnimation = "idle";
        }
        else
        {
            selectedAnimation = queuedAnimation.shift();
        }
        
        animate(ctx, images, selectedAnimation, aux);
    };

    aux();

    document.getElementById("backward").onclick = () => {
        queuedAnimation.push("backward");
    };

    document.getElementById("forward").onclick = () => {
        queuedAnimation.push("forward");
    };

    document.getElementById("kick").onclick = () => {
        queuedAnimation.push("kick");
    };
    
    document.getElementById("punch").onclick = () => {
        queuedAnimation.push("punch");
    };

    document.addEventListener("keyup", (event) => {
        const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"

        if (key === "ArrowDown")
        {
            queuedAnimation.push("kick");
        }
        else if (key === "ArrowRight")
        {
            queuedAnimation.push("forward");
        }
        else if (key === "ArrowLeft")
        {
            queuedAnimation.push("backward");
        }
        else if (key === "ArrowUp")
        {
            queuedAnimation.push("punch");
        }
    });
});



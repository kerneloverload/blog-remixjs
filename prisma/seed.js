const {PrismaClient} = require("@prisma/client");

const db = new PrismaClient();

async function seed(){
    await Promise.all(
        getPosts().map((post) => {
            return db.post.create({data:post});
        })
    );
}

seed();

function getPosts(){
    return [
        {
            title: 'Post 1',
            desc: 'React Js'
        },
        {
            title: 'Post 2',
            desc: 'Next Js'
        },
        {
            title: 'Post 3',
            desc: 'Remix Js'
        },
        {
            title: 'Post 4',
            desc: 'Corn Js'
        },
    ]
}
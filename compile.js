// const fs = require('fs');
const fs = require('fs-extra');
const path = require('path');
const sortBy = require('lodash').sortBy;

const allPost = fs
    .readdirSync(path.resolve('src/posts/'))
    .filter(d => /^\d{4}-/gi.test(d));

const postData = allPost.map(p => {
    const article = fs.readFileSync(
        path.resolve(`src/posts/${p}/article.md`),
        'utf-8'
    );
    const titleHandler = /标题(:|：).+\n/gi.exec(article);
    const tagHandler = /标签(:|：).+\n/gi.exec(article);
    const classifyHandler = /分类(:|：).+\n/gi.exec(article);
    const cllassifySummaryHandler = /简介(:|：).+\n/gi.exec(article);
    const contentHandler = article.split(/={3}\n/gi);

    const title = titleHandler.length
        ? titleHandler[0].replace(/(标题(:|：)\s*|\n)/gi, '')
        : '';
    const tag = tagHandler.length
        ? tagHandler[0].replace(/(标签(:|：)\s*|\n)/gi, '').split(/,\s?/gi)
        : '';
    const classify = classifyHandler.length
        ? classifyHandler[0].replace(/(分类(:|：)\s*|\n)/gi, '')
        : '';
    const classifySummary = cllassifySummaryHandler.length
        ? cllassifySummaryHandler[0].replace(/(简介(:|：)\s*|\n)/gi, '')
        : '';
    const createDate = p.split('_')[0].replace('T', ' ');
    let content = contentHandler.length
        ? contentHandler[contentHandler.length - 1].replace('\n', '')
        : '';

    const summary = contentHandler[contentHandler.length - 1].slice(0, 150)

    fs.ensureDirSync(path.resolve(`public/contents/${p}/`));

    const transDate = (createDate) => {
        var date = new Date();
        date.setFullYear(createDate.substring(0, 4));
        date.setMonth(createDate.substring(5, 7) - 1);
        date.setDate(createDate.substring(8, 10));
        date.setHours(createDate.substring(11, 13));
        date.setMinutes(createDate.substring(14, 16));
        date.setSeconds(createDate.substring(17, 19));
        return Date.parse(date) / 1000;
    }

    let creat_date = transDate(createDate)

    return {
        title,
        tag,
        classify,
        classifySummary,
        createDate,
        year: createDate.slice(0, 4),
        url: `/article/${creat_date}`,
        content,
        summary,
        classifyUrl: `/classifty/${classify}`
    };
});

fs.writeFileSync(
    path.join(path.resolve('public/'), 'data.json'),
    JSON.stringify(postData),
    'utf-8'
);

const getTagInfo = () => {
    const tagList = [];
    postData.forEach(p => {
        p.tag.forEach(t => {
            if (!tagList.find(o => o.tag === t)) {
                tagList.push({
                    tag: t,
                    count: 1,
                });
            } else {
                const tagIdx = tagList.findIndex(o => o.tag === t);
                tagList[tagIdx].count += 1;
            }
        });
    });

    return sortBy(tagList, o => -o.count);
};
const postInfo = {
    postCount: postData.length,
    tagInfo: getTagInfo(),
};

fs.writeFileSync(
    path.join(path.resolve('public/'), 'stat.json'),
    JSON.stringify(postInfo),
    'utf-8'
);

const getClassify = () => {
    const classifyList = [];
    const postList = []
    postData.forEach(p => {
        if (!classifyList.find(o => o.classify === p.classify)) {
            classifyList.push({
                classify: p.classify,
                summary: p.classifySummary,
                classifyUrl: p.classifyUrl,
                count: 1,
                postList: []
            });
        } else {
            const classifyIdx = classifyList.findIndex(o => o.classify === p.classify);
            classifyList[classifyIdx].count += 1;
        }
    });
    return sortBy(classifyList, o => -o.count);
};

const getClassifyList = () => {
    const classify = getClassify()
    postData.forEach(p => {
        classify.forEach(k => {
            if (k.classify === p.classify) {
                k.postList.push(p)
            }
        })
    })
    return sortBy(classify, o => -o.count);
}

const classifyInfo = {
    postCount: postData.length,
    classifyInfo: getClassifyList(),
};
fs.writeFileSync(
    path.join(path.resolve('public/'), 'classify.json'),
    JSON.stringify(classifyInfo),
    'utf-8'
);

console.log('文章打包完毕...');


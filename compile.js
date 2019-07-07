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
  const contentHandler = article.split(/={3}\n/gi);

  const title = titleHandler.length
    ? titleHandler[0].replace(/(标题(:|：)\s*|\n)/gi, '')
    : '';
  const tag = tagHandler.length
    ? tagHandler[0].replace(/(标签(:|：)\s*|\n)/gi, '').split(/,\s?/gi)
    : '';
  const time = p.split('_')[0].replace('T', ' ');
  let content = contentHandler.length
    ? contentHandler[contentHandler.length - 1].replace('\n', '')
    : '';

  const summary  = contentHandler[contentHandler.length - 1].slice(0, 100)

  fs.ensureDirSync(path.resolve(`public/contents/${p}/`));

  const transDate = (time) => {
      var date = new Date();
      date.setFullYear(time.substring(0, 4));
      date.setMonth(time.substring(5, 7) - 1);
      date.setDate(time.substring(8, 10));
      date.setHours(time.substring(11, 13));
      date.setMinutes(time.substring(14, 16));
      date.setSeconds(time.substring(17, 19));
      return Date.parse(date) / 1000;
  }

  let creat_date = transDate(time)

  return {
    title,
    tag,
    time,
    url: `/post/${creat_date}`,
    content,
    summary
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

console.log('文章打包完毕...');


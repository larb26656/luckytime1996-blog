---
title: 
description: 
date: <% tp.file.creation_date() %>
type: Article
image: 
tags: 
draft: true
---
<%*
// If File is untitled prompt the User to set a Title
let title = tp.file.title
if (title.startsWith("Untitled")) {
    title = await tp.system.prompt("Title") ?? "Untitled";
    await tp.file.rename(`${title}`);
}

const folderPath = `src/assets/blogs/${title}`;
const folderExists = app.vault.getAbstractFileByPath(folderPath);

if (!folderExists) {
  await app.vault.createFolder(folderPath);
}

tp.hooks.on_all_templates_executed(async () => {
  const file = tp.file.find_tfile(tp.file.path(true));
  await app.fileManager.processFrontMatter(file, (props) => {
    props["image"] = title;
  });
});
_%>


const $roots = document.querySelectorAll(`[data-template]`);
const importTemplates = async () => {

    for (let $el of $roots) {
        const templateName = $el.dataset.template;
        
        let html = await fetch(`./components/${templateName}.html`)
        .then ( (component) => {return component.text()})
        console.log(html);
        //const html = await (await fetch(`${window.location.href}/components/${templateName}.html`)).text();
        //${window.location.href.replace('/index.html', "")}
        $el.innerHTML = html;
    }
}

importTemplates();

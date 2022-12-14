export const buttons = {

    toggleGraph:  {
        $window: document.querySelector('#swap-graph-container'),
        $button: document.getElementById("toggle-graph"),
        open: true,
        svg: {
            open: `<svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 23 22" color="textSubtle" width="23" xmlns="http://www.w3.org/2000/svg" class="sc-4ba21b47-0 ebMyYP" height="22"><path d="M21.5 1l-20 20" stroke-width="2px" stroke="#7A6EAA" stroke-linecap="round" fill="#7A6EAA"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7.033 19H19.5a1 1 0 100-2H9.033l-2 2zm3-3H18.5a1 1 0 001-1V6.533l-2 2V14h-2v-3.467l-2 2V14h-1.467l-2 2zm.936-8H10.5a1 1 0 00-1 1v.469L10.969 8zm-2 2L5.5 13.469V11a1 1 0 011-1h2.469zM4.5 14.469l-2 2V6a1 1 0 012 0v8.469z" fill="#7A6EAA"></path></svg>`,
            close: `<svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" width="24" color="textSubtle" xmlns="http://www.w3.org/2000/svg" class="sc-4ba21b47-0 ebMyYP" height="24"><path d="M5 7C5 6.44772 4.55228 6 4 6C3.44772 6 3 6.44772 3 7V18C3 19.1046 3.89543 20 5 20H20C20.5523 20 21 19.5523 21 19C21 18.4477 20.5523 18 20 18H5V7Z" fill="#7A6EAA"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M19 17H7C6.44772 17 6 16.5523 6 16V12C6 11.4477 6.44772 11 7 11H10V10C10 9.44772 10.4477 9 11 9H14V7C14 6.44772 14.4477 6 15 6H19C19.5523 6 20 6.44772 20 7V16C20 16.5523 19.5523 17 19 17ZM16 8H18V15H16V8ZM12 15H14V11H12V15ZM10 13H8V15H10V13Z" fill="#7A6EAA"></path></svg>`
        },
    },

    toggleHot: {
        $button: document.getElementById("toggle-hot"),
        open: false,
        svg: {
            open: `<svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" color="textSubtle" width="24" xmlns="http://www.w3.org/2000/svg" class="sc-4ba21b47-0 ebMyYP" height="24" ><path d="M22.5 2l-20 20" stroke="#7A6EAA" stroke-width="2px" stroke-linecap="round" fill="#7A6EAA"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7.66 20.372A7.966 7.966 0 0012.5 22c4.42 0 8-3.58 8-8 0-1.935-.332-3.793-.94-5.527l-2.851 2.851c.192.935.291 1.902.291 2.876.01 2.65-2.14 4.8-4.79 4.8a3.253 3.253 0 01-2.268-.909L7.66 20.372zM17.099 3.87a17.38 17.38 0 00-1.908-2.16c-.35-.34-.94-.02-.84.46.19.94.39 2.18.39 3.29 0 .292-.027.576-.08.848l2.438-2.438zM11.81 9.16c-.155.02-.315.031-.48.031-1.54 0-2.8-.93-3.35-2.26-.1-.2-.14-.32-.2-.54-.11-.42-.66-.55-.9-.18-.18.27-.35.54-.51.83A13.772 13.772 0 004.5 14c0 .752.104 1.48.298 2.17L11.81 9.16z" fill="#7A6EAA"></path></svg>`,
            close: `<svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16" color="textSubtle" width="24" xmlns="http://www.w3.org/2000/svg" class="sc-4ba21b47-0 ebMyYP" height="24" ><path d="M11.3933 3.03997C10.9266 2.35331 10.3933 1.71331 9.79329 1.13997C9.55996 0.913306 9.16663 1.12664 9.23329 1.44664C9.35996 2.07331 9.49329 2.89997 9.49329 3.63997C9.49329 5.01331 8.59329 6.12664 7.21996 6.12664C6.19329 6.12664 5.35329 5.50664 4.98663 4.61997C4.91996 4.48664 4.89329 4.40664 4.85329 4.25997C4.77996 3.97997 4.41329 3.89331 4.25329 4.13997C4.13329 4.31997 4.01996 4.49997 3.91329 4.69331C3.11996 6.05331 2.66663 7.63997 2.66663 9.33331C2.66663 12.28 5.05329 14.6666 7.99996 14.6666C10.9466 14.6666 13.3333 12.28 13.3333 9.33331C13.3333 7.00664 12.6133 4.84664 11.3933 3.03997ZM7.80663 12.6666C6.61996 12.6666 5.65996 11.7333 5.65996 10.5733C5.65996 9.49331 6.35996 8.73331 7.53329 8.49331C8.51329 8.29331 9.51996 7.87331 10.22 7.21331C10.4066 7.03997 10.7133 7.11997 10.7666 7.36664C10.92 8.04664 11 8.75331 11 9.46664C11.0066 11.2333 9.57329 12.6666 7.80663 12.6666Z" fill="#7A6EAA"></path></svg>`,
        },
    },
}


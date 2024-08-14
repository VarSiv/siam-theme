"use strict";

const init = {
    ghostDropdown: (config = {}) => {
        const {
            targetElement = 'ul',
            hasDropdownDetectText = '[has_dropdown]',
            subitemDetectText = '[subitem]',
            hasDropdownClasses = 'has_dropdown',
            submenuUlClasses = 'sub-menu'
        } = config;

        const target = document.querySelector(targetElement);
        const listItems = target.querySelectorAll('li');

        listItems.forEach((li) => {
            const link = li.querySelector('a');
            if (link.textContent.includes(hasDropdownDetectText)) {
                li.classList.add(hasDropdownClasses);
                link.textContent = link.textContent.replace(hasDropdownDetectText, '');
                const subItems = [];
                let nextSibling = li.nextElementSibling;
                while (nextSibling !== null && nextSibling.querySelector('a').textContent.includes(subitemDetectText)) {
                    subItems.push(nextSibling);
                    nextSibling = nextSibling.nextElementSibling;
                }
                if (subItems.length > 0) {
                    const subList = document.createElement('ul');
                    subList.classList.add(submenuUlClasses);
                    subItems.forEach((subItem) => {
                        const subLink = subItem.querySelector('a');
                        subLink.textContent = subLink.textContent.replace(subitemDetectText, '');
                        subList.appendChild(subItem);
                    });
                    li.appendChild(subList);
                }
            }
        });
    }
};

// Initialize
init.ghostDropdown({
    targetElement: '.ghost-dropdown-menu',
    hasDropdownDetectText: '[has_dropdown]',
    hasDropdownClasses: 'has_dropdown',
    subitemDetectText: '[subitem]',
    submenuUlClasses: 'sub-menu'
});
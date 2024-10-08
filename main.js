let ultimoElementoFocado;
function alternarModal(modalId, show) {
    const modal = document.querySelector(`#${modalId}`);
    if (show) {
        modal.style.display = "block";
        ultimoElementoFocado = document.activeElement;
        gerenciarFocoModal(modalId);
    } else {
        modal.style.display = "none";
        if (ultimoElementoFocado) {
            ultimoElementoFocado.focus();
        }
    }

    document.body.style.overflow = show ? "hidden" : "auto"
}

document.addEventListener("keydown", (event) => {
    if (event.key === 'Escape') {
        alternarModal('ver-modal-inscrito', false)
        alternarModal('ver-modal-contato', false)
        alternarModal('ver-modal-enviado', false)

        document.querySelectorAll(".cabecalho__lista-item").forEach((item) => {
            alternarSubmenu(item, false)
        });

    }
})
function gerenciarFocoModal(modalId) {
    const modal = document.querySelector(`#${modalId}`);
    const elementosModal = modal.querySelectorAll('a, button, input, select, textarea,[tabindex]:not([tabindex="-1"])');
    const primeiroElemento = elementosModal[0];
    const ultimoElemento = elementosModal[elementosModal.length - 1];
    primeiroElemento.focus();
    modal.addEventListener("keydown", (event) => {
        if (event.key === "Tab") {
            if (event.shiftKey) {
                if (document.activeElement === primeiroElemento) {
                    event.preventDefault();
                    ultimoElemento.focus();
                }
            } else {
                if (document.activeElement === ultimoElemento || !modal.contains(document.activeElement)) {
                    event.preventDefault();
                    primeiroElemento.focus();
                }
            }
        }
    })

}

function alternarSubmenu(item, display) {
    const submenu = item.querySelector('.submenu');
    if (submenu) {
        submenu.style.display = display ? 'block' : 'none';
        const menuItem = item.querySelector(".cabecalho__lista-item a");
        menuItem.setAttribute("aria-expanded", display ? true : false)
        const dropdownExpandedIcon = item.querySelector(".material-symbols-outlined.icone");
        dropdownExpandedIcon.classList.toggle("active", display);
    }
}

document.querySelectorAll('.cabecalho__lista-item').forEach(item => {
    item.addEventListener("mouseover", () => alternarSubmenu(item, true));
    item.addEventListener("mouseout", () => alternarSubmenu(item, false));
    item.addEventListener("click", () => {
        const submenu = item.querySelector('.submenu');
        const isDisplayed = submenu.style.display === "block";
        alternarSubmenu(item, !isDisplayed)
    });
})

document.querySelectorAll(".botao-acordeao").forEach(button => {
    button.addEventListener("click", () => {
        alternarAcordeao(button)
    });
});

function alternarAcordeao(button) {
    const isAlreadyOpen = button.getAttribute("aria-expanded") === "true";

    document.querySelectorAll(".botao-acordeao").forEach((btn) => {
        btn.setAttribute("aria-expanded", "false");
        const content = btn.nextElementSibling;
        content.classList.remove("expandido");
        content.setAttribute("aria-hidden", "true");
    });

    if (!isAlreadyOpen) {
        button.setAttribute("aria-expanded", "true");
        const content = button.nextElementSibling;
        content.classList.add("expandido");
        content.setAttribute("aria-hidden", "false");
    }

}
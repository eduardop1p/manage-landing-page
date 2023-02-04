import Glide from '@glidejs/glide'
import 'core-js'
import 'regenerator-runtime'

class Manage{
    constructor(){
        this.glideClass = document.querySelector('.glide')
        this.footerSection2 = document.querySelector('.footer-section-2')
        this.glide = null
        this.validMenuFooter = false
    }
    init(){
        this.menuCliked() 
        this.viewPortMaxWidth600()
        this.viewPortMenuFooter()
        this.copyright()
    }
    menuCliked(){
        const menu = document.querySelector('.menu')
        const menus = document.querySelector('.menus')
        const hambuguerMenu = document.querySelector('.menu-hambuguer')
        hambuguerMenu.addEventListener('click', ()=>{
            menus.classList.toggle('menuCliked')
            hambuguerMenu.classList.toggle('menu-hambuguer-actved')
            menu.toggleAttribute('data-menuInBlur')
        })
    }
    viewPortMaxWidth600(){
        const mediaQueryList = window.matchMedia('(max-width: 600px)')
        this.screenOnChangeSlide(mediaQueryList)
        mediaQueryList.addEventListener('change', event => this.screenOnChangeSlide(event))
    }
    screenOnChangeSlide(event){
        if(event.matches) {
            this.glideClass.querySelector('.glide__slides').classList.remove('grid-feedback')
            this.glide = new Glide('.glide', {
                perView: 1,
                startAt: 0,
                autoplay: 3000,
                type: 'carousel'
            }).mount()
            return
        }
        
        if(this.glide){
            this.glideClass.querySelector('.glide__slides').classList.add('grid-feedback')
            this.glide.destroy()
            return
        }
    }
    viewPortMenuFooter(){
        const mediaQueryList = window.matchMedia('(max-width: 1100px)')
        this.screenOnChangeMenusFooter(mediaQueryList)
        mediaQueryList.addEventListener('change', event => this.screenOnChangeMenusFooter(event))
    }
    screenOnChangeMenusFooter(event){
        const arrayElementsMenuFooter = [this.footerSection2.querySelector('.copyright'), this.footerSection2.querySelector('.redes-sociais')]
        const menusFooter = this.footerSection2.querySelectorAll('.menus-footer')
        const inputFooter = this.footerSection2.querySelector('.input-button-footer')
        const logoFooter = this.footerSection2.querySelector('.logo-footer')

        if(event.matches){
            const appendMenuFooter = document.createElement('div')
            appendMenuFooter.classList.add('appendMenuFooter')
            this.footerSection2.appendChild(appendMenuFooter)
            menusFooter.forEach(menusFooter => appendMenuFooter.appendChild(menusFooter))
            arrayElementsMenuFooter.forEach(arrayElementsMenuFooter => this.footerSection2.appendChild(arrayElementsMenuFooter))
            this.validMenuFooter = true
            return
        }
        if(!this.validMenuFooter) return
        menusFooter.forEach(menusFooter => inputFooter.insertAdjacentElement('beforebegin', menusFooter))
        inputFooter.insertAdjacentElement('beforeend', arrayElementsMenuFooter[1])
        logoFooter.insertAdjacentElement('beforeend', arrayElementsMenuFooter[0])
        this.footerSection2.querySelectorAll('.appendMenuFooter').forEach(appendMenuFooter => appendMenuFooter.remove())
    }
    copyright(){
        const copyrightElement = this.footerSection2.querySelector('.copyright')
        copyrightElement.innerHTML = `Copyright ${new Date().getFullYear()}. Todos os direitos reservados a
        <a href="https://www.instagram.com/yfg.eduardo/" target="_blank" rel="noopener noreferrer">
          @yfg.eduardo
        </a>`
    } 
} 
const manage = new Manage()
manage.init()

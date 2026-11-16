import { Injectable } from '@angular/core';
import { ISiteContentModel } from '@business-objects';
import { SiteContent } from '@entities';
import { Result, success } from '@libraries/result-entities';

const FAKE_SITE_CONTENT: SiteContent = {
  siteInfo: {
    terminalPromptUser: 'avexyk@home: ',
    terminalPromptSymbol: '~#',
    startYear: 2019,
    copyrightText: 'Todos los derechos pirateados',
    brandName: 'avexyk software co.',
    version: 'v2.0',
    vagabundiaImageSrc: 'assets/images/random/vagabundia.gif',
    vagabundiaAlt: 'vagabundia',
    vagabundiaToastTitle: 'Gif retro?',
    vagabundiaToastMessage: 'Algo debería suceder?, tal  vez...',
  },
  profile: {
    firstName: 'Francisco Javier',
    highlightedLastName: 'Gil Bautista',
    summaryPrefix: 'Desarrollador de software que radica en ',
    highlightedLocation: 'México',
    summarySuffix: ', actualmente enfocado en programación web desde hace unos años.',
  },
  navItems: [
    {
      id: 'home',
      label: 'Home',
      route: '/',
      iconId: 'home',
      toastMessage: 'Nada por aquí',
    },
  ],
  socialLinks: [
    {
      id: 'github',
      label: 'GitHub',
      url: 'https://github.com/avexyk',
      hoverColorClasses: 'hover:bg-violet-300 dark:hover:bg-violet-800',
    },
  ],
  sections: [
    {
      id: 'experimentos',
      title: 'Experimentos',
      actionLabel: 'Apps →',
      route: '/',
      iconId: 'code-brackets',
      gradientClasses: 'from-pink-600 to-purple-600',
      iconClasses: 'h-5 w-5 -rotate-12 text-green-600',
      actionColorClasses: 'text-amber-400',
      toastMessage: 'En desarrollo',
    },
  ],
  faqTitle: 'FAQ',
  faqs: [
    {
      id: 'nuevo-sitio',
      question: 'Nuevo sitio',
      intro: 'Sí, sucedieron varias cosas:',
      items: ['Dato de prueba determinista.'],
    },
  ],
};

@Injectable()
export class SiteContentModelFake implements ISiteContentModel {
  async getSiteContent(): Promise<Result<SiteContent, string>> {
    return success(FAKE_SITE_CONTENT);
  }
}

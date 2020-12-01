import { Pipe, PipeTransform, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
//import { PatientDataComponent} from './patient-data.component';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {


  transform(items: any[], searchFilter: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchFilter) {
      return items;
    }

    searchFilter = searchFilter.toLowerCase();

    return items.filter(item => {
      let language = this.languageFromCode(item.languageCode);
      let values = `${item.familyName} ${item.givenName} ${item.zip} ${language}`;
      if (values.toLowerCase().includes(searchFilter)) {
        return item;
      }
      
    })



  }

  //TODO: refactor this code so it isn't redundant with patient-data.component.ts
  languageFromCode(langCode) {

    enum CodeMapping {
      vie = "Vietnamese",
      bos = "Bosnian",
      zho = "Chinese",
      spa = "Spanish",
      eng = "English"
    }

    //console.log(CodeMapping[langCode])
    return CodeMapping[langCode]
  }

}

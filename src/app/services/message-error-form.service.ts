import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageErrorFormService {

  constructor(private toastr: ToastrService) { }

  show(controls: any, validationMessages: any) {
    let invalidFormMessages = '';
    let invalidFormMessagesArr: Array<any> = [];
    console.log("controls: ", controls);
    console.log("validationMessages: ", validationMessages);

    for (const name in controls) {
      if (controls[name].invalid) {
        if (controls[name].errors) {
          // tslint:disable-next-line: forin
          for (const errorType in controls[name].errors) {
            try {
              let message = '<li>' + validationMessages[name][errorType] + '</li>';

              if (!invalidFormMessagesArr.includes(message)) {
                invalidFormMessages += message;
                invalidFormMessagesArr.push(message);
              }
            } catch (error) {
              console.error(error);
            }
          }
        } else if ((controls[name] as any).controls) {
          (controls[name] as any).controls.forEach((element: any) => {
            if (element.invalid) {
              if (element.controls) {
                // tslint:disable-next-line: forin
                for (const element2 in element.controls) {
                  let element3 = element.controls[element2];
                  if (element3.invalid) {
                    if (element3.controls) {
                      // tslint:disable-next-line: forin
                      for (const element4 in element3.controls) {
                        let element5 = element3.controls[element4];
                        if (element5.invalid) {
                          if (element5.controls) {
                            // tslint:disable-next-line: forin
                            for (const element6 in element5.controls) {
                              let element7 = element5.controls[element6];
                              if (element7.invalid) {
                                // tslint:disable-next-line: forin
                                for (const errorType in element7.errors) {
                                  try {
                                    let message = '<li>' + validationMessages[name][element6][errorType] + '</li>';

                                    if (!invalidFormMessagesArr.includes(message)) {
                                      invalidFormMessages += message;
                                      invalidFormMessagesArr.push(message);
                                    }
                                  } catch (error) {
                                    console.error(error);
                                  }
                                }
                              }
                            }
                          } else {
                            // tslint:disable-next-line: forin
                            for (const errorType in element5.errors) {
                              try {
                                let message = '<li>' + validationMessages[name][element4][errorType] + '</li>';

                                if (!invalidFormMessagesArr.includes(message)) {
                                  invalidFormMessages += message;
                                  invalidFormMessagesArr.push(message);
                                }
                              } catch (error) {
                                console.error(error);
                              }
                            }
                          }
                        }
                      }
                    } else {
                      // tslint:disable-next-line: forin
                      for (const errorType in element3.errors) {
                        try {
                          let message = '<li>' + validationMessages[name][element2][errorType] + '</li>';

                          if (!invalidFormMessagesArr.includes(message)) {
                            invalidFormMessages += message;
                            invalidFormMessagesArr.push(message);
                          }
                        } catch (error) {
                          console.error(error);
                        }
                      }
                    }
                  }
                }
              } else {
                // tslint:disable-next-line: forin
                for (const errorType in element.errors) {
                  try {
                    let message = '<li>' + validationMessages[name][errorType] + '</li>';

                    if (!invalidFormMessagesArr.includes(message)) {
                      invalidFormMessages += message;
                      invalidFormMessagesArr.push(message);
                    }
                  } catch (error) {
                    console.error(error);
                  }
                }
              }
            }
          });
        }
      }
    }

    if (invalidFormMessages == '') {
      this.toastr.error('<ul><li>Se han detectado errores. Es posible que algunos campos estén vacíos o con un formato incorrecto.</li></ul>', 'Errores');
    } else {
      this.toastr.error('<ul>' + invalidFormMessages + '</ul>', 'Errores');
    }
  }

}

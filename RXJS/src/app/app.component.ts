import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center" class="content">
      <h1>Welcome to {{ title }}!</h1>
      <span style="display: block">{{ title }} app is running!</span>
      <img
        width="300"
        alt="Angular Logo"
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg=="
      />
    </div>
    <h2>Here are some links to help you start:</h2>
    <ul>
      <li>
        <h2>
          <a target="_blank" rel="noopener" href="https://angular.io/tutorial"
            >Tour of Heroes</a
          >
        </h2>
      </li>
      <li>
        <h2>
          <a target="_blank" rel="noopener" href="https://angular.io/cli"
            >CLI Documentation</a
          >
        </h2>
      </li>
      <li>
        <h2>
          <a target="_blank" rel="noopener" href="https://blog.angular.io/"
            >Angular blog</a
          >
        </h2>
      </li>
    </ul>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    // this.myPromise("Cris").then((result) => console.log(result));
    // this.myPromise("Jose")
    //   .then((result) => console.log(result))
    //   .catch((erro) => console.log(erro));

    // this.myObservable("").subscribe(
    //   (result) => console.log(result),
    //   (erro) => console.log(erro)
    // );

    // const obs = this.myObservable("Cris");
    // obs.subscribe(observer);

    const observer = {
      next: (value: any) => console.log("Next: ", value),
      error: (error: any) => console.log("Error: ", error),
      complete: () => console.log("FIM!"),
    };

    const obs = this.userObservable("Admin", "admin@admin.com");
    const subs = obs.subscribe(observer);

    setTimeout(() => {
      subs.unsubscribe();
      console.log(`Conexao fechada: ${subs.closed}`);
    }, 3500);
  }

  title = "RXJS";

  // myPromise(name: string): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     if (name === "Cris") {
  //       setTimeout(() => {
  //         resolve(`Seja bem vindo ${name}`);
  //       }, 1000);
  //     } else {
  //       reject("Ops! Você não é o Cris!");
  //     }
  //   });
  // }

  // myObservable(name: string): Observable<string> {
  //   return new Observable((subscriber) => {
  //     if (name === "Cris") {
  //       subscriber.next(`Seja bem vindo ${name}`);
  //       subscriber.next(`Seja bem vindo ${name}`);
  //       setTimeout(() => {
  //         subscriber.next(`Seja bem vindo ${name}, com delay`);
  //       }, 1000);
  //       subscriber.complete();
  //     } else {
  //       subscriber.error("Ops! Deu erro!");
  //     }
  //   });
  // }

  userObservable(name: string, email: string): Observable<User> {
    return new Observable((subscriber) => {
      if (name === "Admin") {
        let user = new User(name, email);

        setTimeout(() => {
          subscriber.next(user);
        }, 1000);

        setTimeout(() => {
          subscriber.next(user);
        }, 2000);

        setTimeout(() => {
          subscriber.next(user);
        }, 3000);

        setTimeout(() => {
          subscriber.next(user);
        }, 4000);

        setTimeout(() => {
          subscriber.complete();
        }, 5000);
      } else {
        subscriber.error("Ops! Deu erro!");
      }
    });
  }
}

export class User {
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  name: string;
  email: string;
}

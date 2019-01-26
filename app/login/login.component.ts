import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";

import { User } from "../shared/user/user.model";
import { UserService } from "../shared/user/user.service";

@Component({
    selector: "gr-login",
    providers: [UserService],
    templateUrl: "login/login.component.html",
    styleUrls: ["login/login.component.css"]
})
export class LoginComponent implements OnInit {

    user: User;
    isLoggingIn = true;
    isLoading = false;

    constructor(private router: Router, private userService: UserService, private page: Page) {
        this.user = new User();
        this.user.email = "thibtrevisan@gmail.com";
        this.user.password = "juca";
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
    }

    submit() {
        if (this.isLoggingIn) {
            this.login();
        } else {
            this.signUp();
        }
    }

    login() {
        this.isLoading = true;
        this.userService.login(this.user)
            .subscribe(
                () => this.router.navigate(["/list"]),
                (error) => {
                    alert("Unfortunately we could not find your account.");
                    this.isLoading = false;
                },
            );
    }

    signUp() {
        this.isLoading = true;
        this.userService.register(this.user)
            .subscribe(
                () => alert("Your account was successfully created."),
                () => {
                    alert("Unfortunately we were unable to create your account.");
                    this.isLoading = false;
                },
            );
    }

    toggleDisplay() {
        this.isLoggingIn = !this.isLoggingIn;
    }
}
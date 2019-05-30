import { Component, OnInit } from "@angular/core";

import { AuthServiceService } from "./components/user/auth-service.service";

/**
 * The main component.
 */
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthServiceService) {}

  ngOnInit() {
    this.authService.autoAuthUser();
  }
  /**
   * title is referred to as frontend.
   */
  title = "frontend";
}

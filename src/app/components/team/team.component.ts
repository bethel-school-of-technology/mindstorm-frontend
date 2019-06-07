import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-team",
  templateUrl: "./team.component.html",
  styleUrls: ["./team.component.css"]
})
export class TeamComponent implements OnInit {
  showJacob = false;
  showMaria = false;
  showTavo = false;
  showMarty = false;

  constructor() {}

  ngOnInit() {}
}

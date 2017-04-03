import { Component, OnInit, Input } from '@angular/core'
import { ProgressService } from '../../services/progress.service'

@Component({
  selector: 'user-progress-bar',
  templateUrl: './user-progress-bar.component.html',
})
export class UserProgressBarComponent implements OnInit {
  public progress: number
  public isVisible: boolean

  @Input()
  module: string

  @Input()
  visible: boolean

  constructor(private progressService: ProgressService) {}

  ngOnInit() {
    this.progressService.activeUserProgress.subscribe(() => {
      const completed = !!this.progressService.isComplete('modules', this.module)
      const started = this.progressService.getLastAccessed('modules', this.module)
      this.progress = this.progressService.getModuleProgress(this.module)
      this.isVisible = this.visible || (started && !completed)
    })
  }
}

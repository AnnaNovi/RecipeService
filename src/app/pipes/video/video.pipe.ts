import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'video',
})
export class VideoPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  public transform(videoURL: string): string | SafeResourceUrl {
    const isYoutube = videoURL.includes('www.youtube.com');
    if (isYoutube) {
      const videoID = videoURL.split('=').reverse()[0];
      const url = `https://www.youtube.com/embed/${videoID}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else {
      return videoURL;
    }
  }
}

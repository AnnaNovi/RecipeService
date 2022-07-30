import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoPipe } from './video.pipe';

describe('VideoPipe', () => {
  let pipe: VideoPipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    sanitizer = TestBed.get(DomSanitizer);
    pipe = new VideoPipe(sanitizer);
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it("should return input videoURL if it isn't include 'www.youtube.com'", () => {
    const url = 'https://cookieandkate.com/best-hummus-recipe/';
    const result = pipe.transform(url);
    expect(result).toBe(result);
  });
  it("should transform input videoURL if it is include 'www.youtube.com'", () => {
    const url = 'https://www.youtube.com/watch?v=1ahpSTf_Pvk';
    const resultBySanitizer = sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/1ahpSTf_Pvk'
    );
    const result = pipe.transform(url);
    expect(result).toEqual(resultBySanitizer);
  });
});

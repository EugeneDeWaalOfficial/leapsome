import router from "@/router";

describe("router", () => {
  describe("routes", () => {
    const { routes } = router.options;

    it("has routes", () => {
      expect(routes.length).toBeGreaterThan(0);
    });

    it("redirects from `/` to `/home`", () => {
      const route = routes.find(r => r.path === "/");

      const expected = "/home";
      const actual = route.redirect;

      expect(actual).toEqual(expected);
    });

    it("has a path `/home`", () => {
      const route = routes.find(r => r.path === "/home");

      expect(route).not.toEqual(null);
    });

    it("has a path `/praise`", () => {
      const route = routes.find(r => r.path === "/praise");

      expect(route).not.toEqual(null);
    });
  });
});

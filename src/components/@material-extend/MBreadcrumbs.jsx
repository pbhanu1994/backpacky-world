import { last } from "lodash";
import PropTypes from "prop-types";
import NextLink from "next/link";
import { Typography, Box, Link, Breadcrumbs } from "@mui/material";

const Separator = (
  <Box
    component="span"
    sx={{ width: 4, height: 4, borderRadius: "50%", bgcolor: "text.disabled" }}
  />
);

LinkItem.propTypes = {
  link: PropTypes.object,
};

function LinkItem({ link }) {
  const { href, name, query, icon } = link;
  return (
    <NextLink
      key={name}
      href={{ pathname: href, query: { ...query } }}
      passHref
      shallow
    >
      <Link
        variant="body2"
        sx={{
          lineHeight: 2,
          display: "flex",
          alignItems: "center",
          color: "text.primary",
          "& > div": { display: "inherit" },
        }}
      >
        {icon && (
          <Box
            sx={{
              mr: 1,
              "& svg": { width: 20, height: 20 },
            }}
          >
            {icon}
          </Box>
        )}
        {name}
      </Link>
    </NextLink>
  );
}

MBreadcrumbs.propTypes = {
  links: PropTypes.array.isRequired,
  activeLast: PropTypes.bool,
};

export default function MBreadcrumbs({ links, activeLast = false, ...other }) {
  const currentLink = last(links).name;

  const listDefault = links.map((link) => (
    <LinkItem key={link.name} link={link} />
  ));
  const listActiveLast = links.map((link) => (
    <div key={link.name}>
      {link.name !== currentLink ? (
        <LinkItem link={link} />
      ) : (
        <Typography
          variant="body2"
          sx={{
            maxWidth: 260,
            overflow: "hidden",
            whiteSpace: "nowrap",
            color: "text.disabled",
            textOverflow: "ellipsis",
          }}
        >
          {currentLink}
        </Typography>
      )}
    </div>
  ));

  return (
    <Breadcrumbs separator={Separator} {...other}>
      {activeLast ? listDefault : listActiveLast}
    </Breadcrumbs>
  );
}

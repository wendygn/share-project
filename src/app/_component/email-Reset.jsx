// import * as React from "react";
// import {
//   Body,
//   Container,
//   Head,
//   Heading,
//   Hr,
//   Html,
//   Img,
//   Link,
//   Preview,
//   Section,
//   Text,
//   Button,
// } from "@react-email/components";

// export default function Email({ email }) {
//   return (
//     <Html>
//       <Body>
//         <Container>
//           <Text>refsdfsdfsdfsdfsdf</Text>
//           <Button href="https://example.com/reset">click here</Button>
//         </Container>
//       </Body>
//     </Html>
//   );
// }

import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Button,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

export default function Email({ email }) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-[#f6f9fc] py-2.5">
          <Preview> reset your password</Preview>
          <Container className="bg-white border border-solid border-[#f0f0f0] p-[45px]">
            <Section>
              <Text className="text-base font-dropbox font-light text-[#404040] leading-[26px]">
                Hi {email},
              </Text>
              <Text className="text-base font-dropbox font-light text-[#404040] leading-[26px]">
                Someone recently requested a password change for youraccount. If this was you, you can set a new password here:
              </Text>
              <Button className="bg-[#007ee6] rounded text-white text-[15px] no-underline text-center font-dropbox-sans block w-[210px] py-3.5 px-[7px]">
                Reset password
              </Button>
              <Text className="text-base font-dropbox font-light text-[#404040] leading-[26px]">
                If you don&apos;t want to change your password or didn&apos;t
                request this, just ignore and delete this message.
              </Text>
              <Text className="text-base font-dropbox font-light text-[#404040] leading-[26px]">
                To keep your account secure, please don&apos;t forward this
                email to anyone. See our Help Center for{" "}
                <Link className="underline">more security tips.</Link>
              </Text>
              <Text className="text-base font-dropbox font-light text-[#404040] leading-[26px]">
                Happy Sharing File
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}